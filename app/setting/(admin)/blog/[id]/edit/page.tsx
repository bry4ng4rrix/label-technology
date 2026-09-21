import { notFound } from "next/navigation";
import { supabase, type BlogPost } from "@/lib/supabase";
import BlogForm from "../../BlogForm";
import AdminPageHeader from "../../../AdminPageHeader";
import { updateBlogPost } from "../../actions";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .returns<BlogPost[]>()
    .maybeSingle();
  if (!post) notFound();

  const boundUpdate = updateBlogPost.bind(null, post.id);

  return (
    <div>
      <AdminPageHeader
        title={<>Modifier « {post.title} »</>}
        back={{ href: "/setting/blog", label: "Blog" }}
      />
      <div>
        <BlogForm
          action={boundUpdate}
          submitLabel="Enregistrer"
          initialValues={{
            slug: post.slug,
            tag: post.tag,
            publishedAt: post.published_at.slice(0, 10),
            title: post.title,
            excerpt: post.excerpt,
            body: post.body,
            readtime: post.readtime,
            published: post.published,
          }}
        />
      </div>
    </div>
  );
}
