import { useLocation } from 'react-router-dom';
import Seo from './Seo';
import { metaForPath, organizationSchema, breadcrumbSchema, ACTIVITY_BASE, titleCase } from '../data/seo';

// Renders the correct meta tags for whatever route is active.
// Mounted once inside the Router - no per-page wiring needed.
export default function RouteSeo() {
  const { pathname } = useLocation();
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : '/';
  const meta = metaForPath(path);

  const isActivity = path.startsWith(ACTIVITY_BASE + '/');
  const slug = isActivity ? path.slice(ACTIVITY_BASE.length + 1) : '';

  const jsonLd = isActivity
    ? breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: titleCase(slug), path },
      ])
    : path === '/'
    ? organizationSchema()
    : null;

  return (
    <Seo
      path={path}
      title={meta.title}
      description={meta.description}
      type={isActivity ? 'article' : 'website'}
      jsonLd={jsonLd}
    />
  );
}