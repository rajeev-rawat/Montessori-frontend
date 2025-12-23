"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileSpreadsheet, Download, Calendar, Filter } from "lucide-react"

export function ReportsModule() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports & Export</h1>
        <p className="text-muted-foreground">Generate and export student data reports</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Export Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Student Records
            </CardTitle>
            <CardDescription>Download filtered student data as CSV or Excel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Course / Program</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="btech">B.Tech</SelectItem>
                    <SelectItem value="mba">MBA</SelectItem>
                    <SelectItem value="mca">MCA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Branch / Department</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="cse">Computer Science</SelectItem>
                    <SelectItem value="ece">Electronics</SelectItem>
                    <SelectItem value="me">Mechanical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From Year</Label>
                  <Select defaultValue="2015">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 15 }, (_, i) => 2010 + i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>To Year</Label>
                  <Select defaultValue="2024">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 15 }, (_, i) => 2010 + i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Export Format</Label>
                <Select defaultValue="csv">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Generate Export
            </Button>
          </CardContent>
        </Card>

        {/* Quick Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5" />
              Quick Reports
            </CardTitle>
            <CardDescription>Download pre-configured reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between bg-transparent">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                All Students - Current Year
              </span>
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between bg-transparent">
              <span className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Pending Verification Records
              </span>
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between bg-transparent">
              <span className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                Complete Alumni Database
              </span>
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between bg-transparent">
              <span className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                Upload Error Summary
              </span>
              <Download className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
