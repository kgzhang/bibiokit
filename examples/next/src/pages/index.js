import dynamic from "next/dynamic"
import { SearchkitClient, withSearchkit } from "@bibio/client"

import withApollo from "../hocs/with-apollo"

const Search = dynamic(() => import("../components/index.tsx"), { ssr: false })

export default withApollo(withSearchkit(Search, () => {
  const api = new SearchkitClient({ searchOnLoad: true })
  return api
}))