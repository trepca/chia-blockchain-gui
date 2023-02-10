import { type EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';

import type MethodFirstParameter from '../@types/MethodFirstParameter';
import type MethodReturnType from '../@types/MethodReturnType';

export default function query<
  TagTypes extends string,
  ReducerPath extends string,
  Builder extends EndpointBuilder<BaseQueryFn, TagTypes, ReducerPath>,
  TClass extends new (...args: any) => any,
  Method extends keyof InstanceType<TClass> & string
>(
  build: Builder,
  service: TClass,
  command: Method,
  options: {
    transformResponse?: (response: MethodReturnType<TClass, Method>) => any;
    onCacheEntryAdded?: Parameters<
      typeof build.query<MethodReturnType<TClass, Method>, MethodFirstParameter<TClass, Method>>
    >[0]['onCacheEntryAdded'];
    providesTags?: Parameters<
      typeof build.query<MethodReturnType<TClass, Method>, MethodFirstParameter<TClass, Method>>
    >[0]['providesTags'];
    invalidatesTags?: Parameters<
      typeof build.query<MethodReturnType<TClass, Method>, MethodFirstParameter<TClass, Method>>
    >[0]['invalidatesTags'];
  } = {} // Omit<Parameters<typeof build.query<MethodReturnType<TClass, Method>, MethodFirstParameter<TClass, Method>>>[0], 'query'> = {}
) {
  return build.query<MethodReturnType<TClass, Method>, MethodFirstParameter<TClass, Method>>({
    ...options,
    query: (args) => ({
      service,
      command,
      args,
    }),
  });
}
