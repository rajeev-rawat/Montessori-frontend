"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, ChevronLeft, ChevronRight, Eye, Edit } from "lucide-react"

const students = [
  {
    id: "STU2020CSE001",
    name: "Rahul Sharma",
    email: "rahul@email.com",
    course: "B.Tech CSE",
    year: "2024",
    status: "verified",
  },
  {
    id: "STU2020ECE012",
    name: "Priya Patel",
    email: "priya@email.com",
    course: "B.Tech ECE",
    year: "2024",
    status: "verified",
  },
  { id: "STU2019MBA045", name: "Amit Kumar", email: "amit@email.com", course: "MBA", year: "2021", status: "pending" },
  {
    id: "STU2021ME089",
    name: "Sneha Reddy",
    email: "sneha@email.com",
    course: "B.Tech ME",
    year: "2025",
    status: "verified",
  },
  {
    id: "STU2020CSE102",
    name: "Vikram Singh",
    email: "vikram@email.com",
    course: "B.Tech CSE",
    year: "2024",
    status: "verified",
  },
  {
    id: "STU2019EE034",
    name: "Anjali Gupta",
    email: "anjali@email.com",
    course: "B.Tech EE",
    year: "2023",
    status: "pending",
  },
  {
    id: "STU2021CSE201",
    name: "Rohan Mehta",
    email: "rohan@email.com",
    course: "B.Tech CSE",
    year: "2025",
    status: "verified",
  },
  {
    id: "STU2020IT078",
    name: "Kavya Nair",
    email: "kavya@email.com",
    course: "B.Tech IT",
    year: "2024",
    status: "verified",
  },
]

export function AllStudents() {
  const [searchQuery, setSearchQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCourse = courseFilter === "all" || student.course.includes(courseFilter)
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    return matchesSearch && matchesCourse && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Students</h1>
          <p className="text-muted-foreground">View and manage all student records</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export All
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="CSE">B.Tech CSE</SelectItem>
                <SelectItem value="ECE">B.Tech ECE</SelectItem>
                <SelectItem value="ME">B.Tech ME</SelectItem>
                <SelectItem value="EE">B.Tech EE</SelectItem>
                <SelectItem value="IT">B.Tech IT</SelectItem>
                <SelectItem value="MBA">MBA</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Records</CardTitle>
          <CardDescription>
            Showing {filteredStudents.length} of {students.length} students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Passing Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-mono text-sm">{student.id}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-muted-foreground">{student.email}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === "verified" ? "default" : "secondary"}>{student.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">Page 1 of 23,457</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
