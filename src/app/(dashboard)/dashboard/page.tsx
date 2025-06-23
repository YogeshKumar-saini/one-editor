"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Axios from "@/lib/Axios";
import { toast } from "sonner";
import Image from "next/image";

import CreateProject from "./_component/CreateProject";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await Axios.get("/api/project", {
        params: { page },
      });

      if (response.status === 200) {
        setProjects(response.data.data || []);
        setTotalPages(response.data.totalPages);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page]);

  const goToEditor = (projectId: string) => {
    router.push(
      `${process.env.NEXT_PUBLIC_BASE_URL}/editor/${projectId}?file=index.html`
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full px-4 py-8">
      {isLoading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-muted-foreground text-base">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
          <Image
            src="/project.svg"
            width={320}
            height={320}
            alt="No projects"
            priority
          />
          <p className="text-muted-foreground text-base max-w-md">
            You don’t have any projects yet. Start by creating your first one.
          </p>
          <CreateProject buttonVarient="default" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project._id}
              onClick={() => goToEditor(project._id)}
              className="cursor-pointer group hover:shadow-xl transition-all duration-200 border border-border/50"
            >
              <CardHeader>
                <CardTitle className="truncate">{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video border rounded-xl overflow-hidden shadow-sm group-hover:scale-[1.01] transition-transform">
                  <iframe
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/file/${project._id}/index.html`}
                    className="w-full h-full border-none"
                    title={project.name}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
