"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, User, Mail, Phone, GraduationCap, Calendar, MapPin, Edit, Download } from "lucide-react"

interface StudentRecord {
  id: string
  name: string
  email: string
  phone: string
  course: string
  branch: string
  joiningYear: string
  passingYear: string
  dob: string
  gender: string
  address: string
  status: "verified" | "pending"
}

const mockStudent: StudentRecord = {
  id: "STU2020CSE1234",
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 98765 43210",
  course: "B.Tech",
  branch: "Computer Science & Engineering",
  joiningYear: "2020",
  passingYear: "2024",
  dob: "1998-05-15",
  gender: "Male",
  address: "123 Main Street, Bangalore, Karnataka - 560001",
  status: "verified",
}

export function SearchRecords() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState<StudentRecord | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    setTimeout(() => {
      setSearchResult(mockStudent)
      setIsSearching(false)
    }, 800)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Search Records</h1>
        <p className="text-muted-foreground">Find student records by Student ID</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Search by Student ID
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Enter Student ID (e.g., STU2020CSE1234)"
                  className="pl-10 h-12 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>
            <Button className="h-12 px-8" onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Result */}
      {searchResult && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {searchResult.name}
                  <Badge variant={searchResult.status === "verified" ? "default" : "secondary"}>
                    {searchResult.status}
                  </Badge>
                </CardTitle>
                <CardDescription>Student ID: {searchResult.id}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b pb-2">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Full Name</p>
                      <p className="text-sm font-medium">{searchResult.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date of Birth</p>
                      <p className="text-sm font-medium">{searchResult.dob}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Gender</p>
                      <p className="text-sm font-medium">{searchResult.gender}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b pb-2">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">{searchResult.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium">{searchResult.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Address</p>
                      <p className="text-sm font-medium">{searchResult.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b pb-2">Academic Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Course</p>
                      <p className="text-sm font-medium">{searchResult.course}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Branch</p>
                      <p className="text-sm font-medium">{searchResult.branch}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Year</p>
                      <p className="text-sm font-medium">
                        {searchResult.joiningYear} - {searchResult.passingYear}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!searchResult && !isSearching && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium text-foreground mb-2">Search for a Student</h3>
            <p className="text-sm text-muted-foreground">Enter a Student ID to view their complete record</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
