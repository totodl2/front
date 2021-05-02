import React, { ReactNode } from 'react';
import withApi from '../../lib/api/withApi';
import handleApiError from '../../lib/utils/handleApiError';
import { AllGlobalSearchResultTypes } from '../../types/GlobalSearchResultTypes';
import { Maybe } from '../../types/Maybe';

interface GlobalSearchRenderProps {
  results: AllGlobalSearchResultTypes[];
  loading: boolean;
  error: any;
  search: (keywords: string) => Promise<AllGlobalSearchResultTypes[] | null>;
}
type GlobalSearchRenderFunction = (props: GlobalSearchRenderProps) => ReactNode;

type GlobalSearchContainerProps<
  ViewType extends GlobalSearchRenderProps = any
> = {
  view?: React.ComponentType<ViewType>;
  children?: GlobalSearchRenderFunction;
  api: {
    search: {
      all: (params: {
        params: { keywords: string };
      }) => Promise<{
        data: Maybe<{
          hits: AllGlobalSearchResultTypes[];
          offset: number;
          limit: number;
          nbHits: number;
          exhaustiveNbHits: boolean;
          processingTimeMs: number;
          query: Maybe<string>;
        }>;
        status: number;
        headers: object;
        request: object;
      }>;
    };
  };
};

type GlobalSearchContainerState = {
  loading: boolean;
  results: AllGlobalSearchResultTypes[];
  error: any;
};

class GlobalSearchContainer<
  ViewType extends GlobalSearchRenderProps = any
> extends React.PureComponent<
  GlobalSearchContainerProps<ViewType>,
  GlobalSearchContainerState
> {
  state = {
    loading: false,
    results: [],
    error: null,
  };

  search = async (keywords: string) => {
    const { api } = this.props;
    try {
      this.setState({ loading: true, error: null });
      const results = await api.search.all({
        params: { keywords },
      });
      const hits = results?.data?.hits || [];
      this.setState({ results: hits });
      return hits;
    } catch (e) {
      this.setState({ error: handleApiError(e) });
    } finally {
      this.setState({ loading: false });
    }
    return null;
  };

  render() {
    const { view: View, api: ignoredApi, ...props } = this.props;
    const { results, loading, error } = this.state;
    const newProps = {
      results,
      loading,
      error,
      search: this.search,
    };

    if (View) {
      // @ts-ignore
      return <View {...props} {...newProps} />;
    }

    if (this.props.children) {
      return this.props.children(newProps);
    }

    throw new Error('Cannot found renderer');
  }
}

export default withApi()(GlobalSearchContainer);
