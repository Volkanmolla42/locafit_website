import { Suspense, lazy, ComponentType } from 'react';

interface LazyLoadProps {
  loading?: JSX.Element;
}

export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  loadingComponent: JSX.Element = <div>Yükleniyor...</div>
) {
  const LazyComponent = lazy(importFunc);

  return function WithLazyLoad(props: Parameters<T>[0] & LazyLoadProps) {
    const { loading = loadingComponent, ...rest } = props;

    return (
      <Suspense fallback={loading}>
        <LazyComponent {...rest} />
      </Suspense>
    );
  };
}

// Kullanım örneği:
// const LazyContactForm = lazyLoad(() => import('../forms/ContactForm'), <LoadingSpinner />);
