import { useGetBrandHome, getGetBrandHomeQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero";
import MetricsSection from "@/components/sections/metrics";
import StartupsSection from "@/components/sections/startups";
import ProjectsSection from "@/components/sections/projects";
import CourseSection from "@/components/sections/course";
import BlogNewsletterSection from "@/components/sections/blog-newsletter";

export default function Home() {
  const { data: brandHome, isLoading, error } = useGetBrandHome({
    query: { queryKey: getGetBrandHomeQueryKey() }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-8 space-y-8">
          <Skeleton className="h-16 w-3/4 max-w-2xl rounded-lg" />
          <Skeleton className="h-8 w-1/2 max-w-md rounded-lg" />
          <Skeleton className="h-32 w-full max-w-3xl rounded-lg mt-8" />
        </main>
      </div>
    );
  }

  if (error || !brandHome) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-serif mb-4">Não foi possível carregar o perfil</h1>
        <p className="text-muted-foreground">Tente atualizar a página.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-primary-foreground">
      <Navbar profile={brandHome.profile} socials={brandHome.socials} />
      <main className="flex-grow">
        <HeroSection profile={brandHome.profile} />
        {brandHome.metrics && brandHome.metrics.length > 0 && (
          <MetricsSection metrics={brandHome.metrics} />
        )}
        {brandHome.startups && brandHome.startups.length > 0 && (
          <StartupsSection startups={brandHome.startups} />
        )}
        {brandHome.projects && brandHome.projects.length > 0 && (
          <ProjectsSection projects={brandHome.projects} />
        )}
        {brandHome.course && (
          <CourseSection course={brandHome.course} />
        )}
        <BlogNewsletterSection posts={brandHome.blogPosts} />
      </main>
      <Footer profile={brandHome.profile} socials={brandHome.socials} />
    </div>
  );
}
