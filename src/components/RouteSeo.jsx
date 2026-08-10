import { useLocation } from 'react-router-dom';
import Seo from './Seo';
import {
  metaForPath, organizationSchema, breadcrumbSchema,
  ACTIVITY_BASE, titleCase, langFromPath, stripLang, alternatesFor,
} from '../data/seo';

export default function RouteSeo() {
  const { pathname } = useLocation();
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : '/';
  const lang = langFromPath(clean);
  const base = stripLang(clean);
  const meta = metaForPath(base, lang);

  const isActivity = base.startsWith(ACTIVITY_BASE + '/');
  const slug = isActivity ? base.slice(ACTIVITY_BASE.length + 1) : '';

  const jsonLd = isActivity
    ? breadcrumbSchema([{ name: 'Home', path: clean.replace(base, '') || '/' }, { name: titleCase(slug), path: clean }])
    : base === '/'
    ? organizationSchema()
    : null;

  return (
    <Seo
      path={clean}
      title={meta.title}
      description={meta.description}
      type={isActivity ? 'article' : 'website'}
      lang={lang}
      alternates={alternatesFor(base)}
      jsonLd={jsonLd}
    />
  );
}