"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const schools = [
  {
    id: 9,
    name: "Montessori Invictus, Hyderabad",
    email: "invitictus10@gmail.com",
    SchoolName: "MIH",
  },
  {
    id: 8,
    name: "Sproutz School, Khanamit, Hyderabad",
    email: "contact@sproutzschool.in",
    SchoolName: "SSKH",
  },
  {
    id: 7,
    name: "Monte International School, NH-44, Kallur",
    email: "office.cbmonte@gmail.com",
    SchoolName: "MISNHK",
  },
  {
    id: 6,
    name: "Montessori Elite EM School, Anantapur",
    email: "Admin@montessorieliteschool.com",
    SchoolName: "MEEMSA",
  },
  {
    id: 5,
    name: "Montessori English Medium High School, Panchalingala",
    email: "Panchalingala@GMAIL.COM",
    SchoolName: "MEMHSP",
  },
  {
    id: 4,
    name: "Montessori Indus Residential School, NH-44, Kallur",
    email: "indusschool10@gmail.com",
    SchoolName: "MIRSNHK",
  },
  {
    id: 3,
    name: "Montessori Senior Secondary School, A-Camp, Kurnool",
    email: "montescbse17@gmail.com",
    SchoolName: "MSSSACK",
  },
  {
    id: 2,
    name: "Montessori High School, Alampur",
    email: "alampur123@gmail.com",
    SchoolName: "MHSA",
  },
  {
    id: 1,
    name: "Montessori EM High School, Vidya Nagar, Kurnool",
    email: "montessorividyanagar1974@gmail.com",
    SchoolName: "MEMHSVNK",
  },
  {
    id: 10,
    name: "Super Admin",
    email: "montesraj@yahoo.com",
    SchoolName: "",
  },
];

export default function Schools() {
  const router = useRouter();

  /* ================= HANDLE SELECT ================= */
  const handleSelect = (email: string, schoolName: string) => {
    // Clear old data
    sessionStorage.removeItem("login_email");
    sessionStorage.removeItem("login_school");

    // Save only if available
    if (email) {
      sessionStorage.setItem("login_email", email);
    }

    if (schoolName) {
      sessionStorage.setItem("login_school", schoolName);
    }

    router.push("/login");
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
        <Image
          src="/logo.png"
          alt="Watermark"
          width={600}
          height={600}
          className="object-contain"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={90}
            height={90}
            className="object-contain"
          />
          <div>
            <h1 className="font-semibold">Montessori</h1>
            <p className="text-xs text-muted-foreground">
              Student Records Management Portal
            </p>
          </div>
        </div>
      </header>

      {/* School Boxes */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <button
              key={school.id}
              onClick={() =>
                handleSelect(school.email, school.SchoolName)
              }
              className="border rounded-xl p-6 bg-card text-left hover:shadow-lg hover:border-primary transition-all"
            >
              <h2 className="text-lg font-semibold">{school.name}</h2>

              {school.SchoolName && (
                <p className="text-xs text-muted-foreground mt-1">
                  Code: {school.SchoolName}
                </p>
              )}
            </button>
          ))}
        </div>
      </main>

      <footer className="border-t relative z-10">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2025 Montessori Education. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
