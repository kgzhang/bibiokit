import dynamic from 'next/dynamic';
import { SearchkitClient, withSearchkit } from '@bibio/client';
import '@elastic/eui/dist/eui_theme_light.css';
import withApollo from '../hocs/with-apollo';
import Search from '../components/search';

// const Search = dynamic(() => import('../components/search'), { ssr: false });

export default withApollo({ ssr: false })(
  withSearchkit(Search, () => new SearchkitClient({ searchOnLoad: true })),
);
