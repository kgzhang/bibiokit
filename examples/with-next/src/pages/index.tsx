import { withSearchkit, SearchkitClient } from "@bibio/client"
import withApollo from "../hocs/with-apollo"
import dynamic from 'next/dynamic'

const Search = dynamic(() => import('../components/index'), { ssr: false })


export default withApollo(withSearchkit(Search, () => {
  const api = new SearchkitClient({ searchOnLoad: true })
  return api
}))