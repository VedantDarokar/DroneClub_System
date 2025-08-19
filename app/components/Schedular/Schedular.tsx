"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar" // ShadCN calendar component
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CheckCircle2, CalendarDays, Search } from "lucide-react"
import { getSchedules, createSchedule, completeSchedule, getMembers, getMe } from "@/lib/api"
import { toast } from "@/hooks/use-toast"; // or wherever your toast is

interface Schedule {
  id: string
  date: string
  task: string
  assignedTo: string[]
  completed: boolean
}

export default function ScheduleSection() {
	const [schedules, setSchedules] = useState<Schedule[]>([])
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
	const [task, setTask] = useState("")
	const [loading, setLoading] = useState(true)
	const [isAdmin, setIsAdmin] = useState(false) // set this from auth context
	const [user, setUser] = useState<{ id: string; role: string } | null>(null);
	const [members, setMembers] = useState<{ id: string; name: string }[]>([]);
	const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
	const [showMineOnly, setShowMineOnly] = useState(false)
	const [searchText, setSearchText] = useState("")

	useEffect(() => {
		loadSchedules();
		loadMembers();
		// Fetch current user info
		getMe().then(u => {
			setUser(u);
			setIsAdmin(u.role === "admin");
		}).catch(() => {
			toast({ title: "Not authenticated", description: "Please log in to view schedules." })
		});
	}, []);

	const loadMembers = async () => {
		try {
			const data = await getMembers(); // Fetch members from backend
			setMembers(data);
		} catch {
			toast({ title: "Failed to load members" })
		}
	};

	const loadSchedules = async () => {
		setLoading(true)
		try {
			const data = await getSchedules()
			setSchedules(data)
		} catch {
			toast({ title: "Failed to load schedules" })
		} finally {
			setLoading(false)
		}
	}

	const handleCreate = async () => {
		if (!selectedDate || !task || selectedMembers.length === 0) return;
		try {
			await createSchedule({
				date: selectedDate.toISOString(),
				task,
				assignedTo: selectedMembers,
			});
			setTask("");
			setSelectedMembers([]);
			await loadSchedules();
			toast({ title: "Schedule created", description: "Members notified via email." });
		} catch {
			toast({ title: "Could not create schedule" })
		}
	}

	const handleComplete = async (id: string) => {
		try {
			await completeSchedule(id)
			await loadSchedules()
			toast({ title: "Task completed" })
		} catch {
			toast({ title: "Failed to complete task" })
		}
	}

	const memberMap = useMemo(() => {
		const map: Record<string, string> = {};
		members.forEach(m => { map[m.id] = m.name; });
		return map;
	}, [members]);

	const filteredSchedules = useMemo(() => {
		let list = [...schedules]
		if (showMineOnly && user) {
			list = list.filter(s => s.assignedTo.includes(user.id))
		}
		if (searchText.trim()) {
			const q = searchText.toLowerCase()
			list = list.filter(s => s.task.toLowerCase().includes(q))
		}
		return list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
	}, [schedules, showMineOnly, user, searchText])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Team Schedule</h1>
        <p className="text-gray-600">View and manage upcoming schedules</p>
      </div>

      {isAdmin && (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5" />
              <span>Create Schedule</span>
            </CardTitle>
            <CardDescription>
              Assign a task to members for a specific date
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Task</label>
              <Textarea
                placeholder="Enter task description"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="min-h-24"
              />
            </div>
            <select
              multiple
              value={selectedMembers}
              onChange={e =>
                setSelectedMembers(
                  Array.from(e.target.selectedOptions, option => option.value)
                )
              }
              className="w-full border rounded p-2"
            >
              {members.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{selectedMembers.length} selected</span>
              <Button onClick={handleCreate} disabled={!selectedDate || !task || selectedMembers.length === 0}>
                Create Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
          <CardDescription>
            Mark as complete when finished
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex items-center gap-2 max-w-sm w-full">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search tasks..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch id="mine" checked={showMineOnly} onCheckedChange={setShowMineOnly} />
              <label htmlFor="mine" className="text-sm text-gray-600">My tasks only</label>
            </div>
          </div>
          <Separator />

          {loading && (
            <div className="space-y-3">
              <div className="h-20 rounded-md bg-gray-100 animate-pulse" />
              <div className="h-20 rounded-md bg-gray-100 animate-pulse" />
              <div className="h-20 rounded-md bg-gray-100 animate-pulse" />
            </div>
          )}

          {!loading && filteredSchedules.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <CalendarDays className="h-10 w-10 mx-auto mb-2 text-gray-400" />
              <p>No schedules found.</p>
            </div>
          )}

          {!loading && filteredSchedules.length > 0 && (
            <div className="space-y-3">
              {filteredSchedules.map((s, idx) => {
                const prev = filteredSchedules[idx - 1]
                const showHeader = !prev || new Date(prev.date).toDateString() !== new Date(s.date).toDateString()
                return (
                  <div key={s.id} className="space-y-2">
                    {showHeader && (
                      <div className="text-xs uppercase tracking-wide text-gray-500 mt-4">
                        {new Date(s.date).toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
                      </div>
                    )}
                    <div className="flex items-center justify-between border p-3 rounded-lg bg-white">
                      <div>
                        <p className="font-medium">{s.task}</p>
                        <p className="text-xs text-gray-400">
                          Assigned to: {s.assignedTo.map(id => memberMap[id] || id).join(", ")}
                        </p>
                        <Badge variant={s.completed ? "default" : "secondary"} className={s.completed ? "bg-green-600" : ""}>
                          {s.completed ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                      {!s.completed && user && s.assignedTo.includes(user.id) && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <CheckCircle2 className="h-4 w-4 mr-1" /> Complete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Mark task as complete?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will mark the task as completed for you.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleComplete(s.id)}>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
