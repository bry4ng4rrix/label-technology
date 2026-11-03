-- Export des données du site (labeltechnology.mg) depuis Supabase, en un seul JSON.
--
-- Supabase → SQL Editor → New query → coller ce fichier → Run.
-- Le résultat est UNE ligne, UNE cellule « export » : la copier en entier
-- (bouton de copie de la cellule, ou Export → Copy as JSON) dans un fichier
-- supabase-export.json, puis côté Laura :
--
--     python -m app.site_import supabase-export.json
--
-- Ou sans passer par le navigateur, avec la chaîne de connexion Supabase :
--     psql "<connection string>" -At -f deploy/supabase-export.sql > supabase-export.json
--
-- Lecture seule : ce script ne modifie rien dans Supabase.
-- Le fichier contient des données personnelles (candidatures) : ne pas le
-- commiter, le supprimer après l'import.

select json_build_object(
  'services',         (select coalesce(json_agg(t order by t."order"), '[]') from public.services t),
  'projects',         (select coalesce(json_agg(t order by t."order"), '[]') from public.projects t),
  'job_offers',       (select coalesce(json_agg(t order by t."order"), '[]') from public.job_offers t),
  'blog_posts',       (select coalesce(json_agg(t order by t.published_at), '[]') from public.blog_posts t),
  'testimonials',     (select coalesce(json_agg(t order by t."order"), '[]') from public.testimonials t),
  'tag_meta',         (select coalesce(json_agg(t order by t."order"), '[]') from public.tag_meta t),
  'settings',         (select coalesce(json_agg(t order by t.key), '[]') from public.settings t),
  'job_applications', (select coalesce(json_agg(t order by t.created_at), '[]') from public.job_applications t)
) as export;
