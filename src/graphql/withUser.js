import { graphql } from 'react-apollo';
import MYSELF_QUERY from './myselfQuery.graphql';

const withUser = fields => (
  graphql(MYSELF_QUERY, {
    props: ({ ownProps, data: { viewer, loading, error } }) => (
      !viewer ? { loading } : fields({
        ownProps,
        viewer,
        loading,
        error
      })
    )
  })
);

export default withUser;
