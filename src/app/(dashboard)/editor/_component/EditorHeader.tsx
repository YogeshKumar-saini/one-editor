"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

import { ArrowLeft, Database, AppWindow } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import Axios from "@/lib/Axios";
import { useEditorContext } from "../_provider/EditorProvider";
import UpdateProject from "./UpdateProject";
import { cn } from "@/lib/utils";

const EditorHeader = () => {
  const router = useRouter();
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState({ name: "" });

  const {
    isLoading: editorUpdateLoading,
    openBrowser,
    setOpenBrowser,
  } = useEditorContext();

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      const res = await Axios.get("/api/project", {
        params: { projectId },
      });
      if (res.status === 200) {
        setProject(res?.data?.data?.[0]);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to fetch project.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) fetchProject();
  }, [projectId]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full h-14 px-4 flex items-center justify-between",
        "backdrop-blur-md border-b bg-white/60 dark:bg-black/40"
      )}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={20} />
        </Button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 truncate">
            <h2 className="text-base font-semibold truncate">
              {isLoading ? "Loading..." : project?.name || "Untitled Project"}
            </h2>
            {!isLoading && (
              <UpdateProject
                name={project?.name}
                projectId={projectId as string}
                fetchData={fetchProject}
              />
            )}
          </div>
          <div
            className={cn(
              "flex items-center text-xs gap-1 text-muted-foreground",
              editorUpdateLoading && "animate-pulse text-blue-600"
            )}
          >
            <Database size={14} />
            {editorUpdateLoading ? "Saving..." : "All changes saved"}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setOpenBrowser(!openBrowser)}
          className={cn(
            "transition-all text-muted-foreground hover:text-primary",
            openBrowser && "text-primary"
          )}
          aria-label="Preview Project"
        >
          <AppWindow size={20} />
        </Button>

        <UserAvatar />
      </div>
    </header>
  );
};

export default EditorHeader;
