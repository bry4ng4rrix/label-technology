import BlogForm from "../BlogForm";
import AdminPageHeader from "../../AdminPageHeader";
import { createBlogPost } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <AdminPageHeader
        title={<>Nouvel article</>}
        back={{ href: "/setting/blog", label: "Blog" }}
      />
      <div>
        <BlogForm action={createBlogPost} submitLabel="Créer l'article" />
      </div>
    </div>
  );
}
