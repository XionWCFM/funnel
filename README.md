![usefunnel thumbnail](/thumbnail.png)

# useFunnel

**Freedom From Details** : Instead of relying directly on the router, it provides instructions on where to route.

**Flexible Customization** : We advocate funnel management via queryString, but you can also implement it another way via useCoreFunnel.

**Nested funnel support** : Managing nested funnels is one of the biggest headaches. We offer a way to deal with this

**Guard support** : Provides a way to block access by malicious users.

**Separate declaration and use of funnels** : For flexible design, we separate the part that defines the funnel from the part that uses it.

# Philosophy

**Querystring First**

In order to provide a smooth user experience through integration with the history stack, the use of query strings is inevitable.

So we provide an API to better manage funnels through query strings.

**Doesn't change route**

Many frameworks provide routers to change paths. Supporting all of this would be very tedious. Instead we provide a query string telling us how to change the path.

**Declarative**

We aim for code that allows you to see at a glance how the funnel should behave.

# Supported

Currently officially supported are `next.js app router`, `next.js pages router`, `react-router-dom`.

# Installation

**nextjs app router**

```
npm i qs @xionhub/funnel-core @xionhub/funnel-client @xionhub/funnel-app-router-adapter
```

**nextjs pages router**

```
npm i qs @xionhub/funnel-core @xionhub/funnel-client @xionhub/funnel-pages-router-adapter
```

**react-router-dom**

```
npm i qs @xionhub/funnel-core @xionhub/funnel-client @xionhub/funnel-react-router-dom-adapter
```

# Quick Start

## next.js app router

### Requirements

```
qs : >=6
next : >=13
react : >=16.8
react-dom : >=16.8
```

### Installation

```
npm i qs @xionhub/funnel-core @xionhub/funnel-client @xionhub/funnel-app-router-adapter
```

```
yarn add qs @xionhub/funnel-core @xionhub/funnel-client @xionhub/funnel-app-router-adapter
```

```
pnpm i qs @xionhub/funnel-core @xionhub/funnel-client @xionhub/funnel-app-router-adapter
```

### create funnelOptions

```tsx
import { funnelOptions } from "@xionhub/funnel-core";

const basicFunnelOptions = () =>
  funnelOptions({
    // steps is a string array and represents a collection of funnels.
    steps: ["a", "b", "c"] as const,
    // funnelId is the key value of queryString
    funnelId: "hello-this-is-funnel-id",
    // defaultPrefix is ​​usually entered as pathname.
    defaultPrefix: "/funnel",
  });
```

### import useFunnel

```tsx
"use client";
import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { useRouter } from "next/navigation";

export const BasicFunnel = () => {
  const [Funnel, { createStep }] = useFunnel(basicFunnelOptions());
  const router = useRouter();
  return (
    <Funnel>
      <Funnel.Step name="a">
        <FunnelItem
          setStep={() => {
            // equal router.push('/funnel?hello-this-is-funnel-id=b')
            router.push(createStep("b"));
          }}
          step="a"
        />
      </Funnel.Step>
      <Funnel.Step name="b">
        <FunnelItem
          setStep={() => {
            router.push(createStep("c"));
          }}
          step="b"
        />
      </Funnel.Step>
      <Funnel.Step name="c">
        <FunnelItem
          setStep={() => {
            router.push(createStep("a"));
          }}
          step="c"
        />
      </Funnel.Step>
    </Funnel>
  );
};

const FunnelItem = ({ setStep, step }: Props) => {
  return (
    <div className=" flex flex-col gap-y-16 justify-center items-center">
      <div>current location {step}</div>
      <button
        className=" bg-purple-400 rounded-full py-4 px-4"
        onClick={() => setStep()}
      >
        go to next funnel
      </button>
    </div>
  );
};
```

### Wrapping Suspense

```tsx
import { Suspense } from "react";
import { BasicFunnel } from "~/src/basic-funnel";

export default function Page() {
  return (
    <div>
      <Suspense>
        <BasicFunnel />
      </Suspense>
    </div>
  );
}
```

The app router adapter relies on useSearchParams internally. This hook is necessary because it demands suspense

# API

## useCoreFunnel

```tsx
declare const useCoreFunnel: <Steps extends NonEmptyArray<string>>(
  options: FunnelOptions<Steps> & {
    onStepChange?: FunnelStepChangeFunction<Steps>;
  }
) => [
  ((props: RouteFunnelProps<Steps>) => JSX.Element) & {
    Step: (props: StepProps<Steps>) => JSX.Element;
    Guard: <T>(props: GuardProps<T>) => JSX.Element;
  },
  {
    funnelId: string;
    step: Steps[number] | undefined;
    onStepChange: FunnelStepChangeFunction<Steps>;
    steps: Steps;
  },
];
```

## funnelOptions

```tsx
type FunnelOptions<T extends NonEmptyArray<string>> = {
  steps: T;
  step?: T[number] | undefined; // default undefined
  funnelId: string;
  defaultPrefix?: string; // default ""
  defaultAddQueryPrefix?: boolean; // default true
};
```

`funnelOptions` shares the same concept as queryOptions in tanstack query. Used to create a type-safe option object.

`steps` is a string array that represents the number of cases in the funnel.

`step` represents the current position in the funnel. When using an adapter, do not enter the steps because the adapter takes care of it.

`funnelId` is generally used as the key value of querystring.

`defaultPrefix` is ​​mainly used for pathname. Default is ""

`defaultAddQueryPrefix` determines whether to include the "?" character in queryString. default is true.

## Guard

```tsx
type GuardProps<T = boolean> = {
  condition:
    | (() => T)
    | (() => Promise<T>)
    | boolean
    | (() => boolean)
    | (() => Promise<boolean>);
  children?: ReactNode;
  onRestrict?: (param: Awaited<T>) => void;
  conditionBy?: (param: Awaited<T>) => boolean;
  fallback?: ReactNode;
};
```

`condition` must be a function or boolean that returns whether the funnel is accessible.

`onRestrict` runs when condition is false.

`conditionBy` is required when condition is not a boolean or a function that returns a boolean. It should return a boolean.

`fallback` is the fallback that will be displayed when the condition is Falsy.

## useFunnel For App Router

```tsx
declare const useFunnel: <Steps extends NonEmptyArray<string>>(
  options: Omit<FunnelOptions<Steps>, "step">
) => [
  ((props: RouteFunnelProps<Steps>) => JSX.Element) & {
    Step: (props: StepProps<Steps>) => JSX.Element;
    Guard: <T>(props: _GuardProps<T>) => JSX.Element;
  },
  {
    createStep: (
      step: string,
      options: {
        searchParams?: URLSearchParams;
        deleteQueryParams?: string[] | string;
        prefix?: string;
        qsOptions?: QueryString.IStringifyBaseOptions;
      }
    ) => string;
    funnelId: string;
    step: Steps[number] | undefined;
    steps: Steps;
  },
];
```

`createStep` is the same API as FunnelClient.createStep.

Using createStep, you can create, delete, or update the query string for the next step.

## Funnel Client

Funnel Client provides utility functions to help manage query string funnels.

### FunnelClient.createStep

```tsx
createStep(step:string , options:{
  searchParams?: URLSearchParams;
  deleteQueryParams?: string[] | string;
  prefix?: string;
  qsOptions?: QueryString.IStringifyBaseOptions;
})
```

For deleteQueryParams, enter the key value of queryParams you want to delete. qsOptions uses StringifyBaseOptions from the qs library.

In the case of `prefix` and `qsOptions.addQueryPrefix`, if entered as options in createStep, the value is used. Otherwise, the value entered in funnelOptions is used.

# Examples

## Default Step Example

```tsx
const [Funnel, { createStep, step }] = useFunnel(defaultStepFunnelOptions());

useEffect(() => {
  if (step === undefined) {
    router.replace(createStep("a"));
  }
}, []);
```

To hide detail and increase cohesion, you may need to specify which step your funnel should start with by default.

In that case, use useEffect to move to the desired step when the current step is invalid.

Another option is `useFunnelDefaultStep`

```tsx
import { funnelOptions, useFunnelDefaultStep } from "@xionhub/funnel-core";

const [Funnel, { createStep, step }] = useFunnel(defaultStepFunnelOptions());
const router = useRouter();

useFunnelDefaultStep(step, () => {
  router.replace(createStep("a"));
});
```

## Guard Example

```tsx
<Funnel.Guard
  condition={Math.random() > 0.5}
  onRestrict={() => {
    router.replace("/home");
  }}
>
  <FunnelItem
    setStep={() => {
      router.push(createStep("c"));
    }}
    step="b"
  />
</Funnel.Guard>
```

If you pass a boolean to `condition`, children will be rendered when the condition is true, and if it is false, a `fallback` will be rendered and the `onRestirct` event will occur.

```tsx
<Funnel.Guard
  condition={async () => {
    if (Math.random() > 0.5) {
      return true;
    }
    await new Promise((res) => setTimeout(res, 1000));
    return false;
  }}
  onRestrict={() => {
    router.replace("/home");
  }}
>
  <FunnelItem
    setStep={() => {
      router.push(controller.createStep("c"));
    }}
    step="b"
  />
</Funnel.Guard>
```

By passing a promise or async function to `condition`, you can delay execution of the onRestrict function until the promise is completed.

```tsx
<Funnel.Guard
  condition={async () => {
    if (Math.random() > 0.5) {
      return {
        type: "A",
        condition: false,
      };
    }
    if (Math.random() > 0.5) {
      return {
        type: "B",
        condition: false,
      };
    }
    return {
      type: "",
      condition: true,
    };
  }}
  conditionBy={({ condition }) => condition}
  onRestrict={({ type }) => {
    if (type === "A") {
      router.replace("/a");
    }
    if (type === "B") {
      router.replace("/b");
    }
  }}
>
  <FunnelItem
    setStep={() => {
      router.push(controller.createStep("c"));
    }}
    step="b"
  />
</Funnel.Guard>
```

`condition` can return other values ​​instead of Boolean. If you didn't return a boolean instead, You need to convert the value to boolean via `conditionBy`.

Because the return value of `condition` is passed to `onRestrict` and `conditionBy`, inaccessibility processing can be performed in various ways.

## Nested Funnel Example

```tsx
export const aFunnelOptions = () =>
  funnelOptions({
    funnelId: "sadkl",
    steps: ["astart", "ado", "aend"] as const,
  });

export const bFunnelOptions = () =>
  funnelOptions({
    funnelId: "sadkl2",
    steps: ["bstart", "bdo", "bend"] as const,
  });

export const NestedFunnel = () => {
  const [AFunnel, aController] = useFunnel(aFunnelOptions());
  const [BFunnel, bController] = useFunnel(bFunnelOptions());
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className=" px-16 py-16">
      <AFunnel>
        <AFunnel.Step name={"astart"}>
          <FunnelItem
            setStep={() => {
              router.push(aController.createStep("ado"));
            }}
            step={"astart"}
          />
        </AFunnel.Step>
        <AFunnel.Step name={"ado"}>
          <FunnelItem
            setStep={() => {
              router.push(
                bController.createStep("bstart", {
                  searchParams,
                  deleteQueryParams: aController.funnelId,
                })
              );
            }}
            step={"ado"}
          />
        </AFunnel.Step>
        <AFunnel.Step name={"aend"}>
          <FunnelItem
            setStep={() => {
              router.push(aController.createStep("astart"));
            }}
            step={"aend"}
          />
        </AFunnel.Step>
      </AFunnel>

      <BFunnel>
        <BFunnel.Step name={"bstart"}>
          <FunnelItem
            setStep={() => {
              router.push(bController.createStep("bdo"));
            }}
            step={"bstart"}
          />
        </BFunnel.Step>
        <BFunnel.Step name={"bdo"}>
          <FunnelItem
            setStep={() => {
              router.push(bController.createStep("bend"));
            }}
            step={"bdo"}
          />
        </BFunnel.Step>
        <BFunnel.Step name={"bend"}>
          <FunnelItem
            setStep={() => {
              router.push(
                aController.createStep("aend", {
                  searchParams,
                  deleteQueryParams: bController.funnelId,
                })
              );
            }}
            step={"bend"}
          />
        </BFunnel.Step>
      </BFunnel>
    </div>
  );
};
```

When implementing nested funnels, there are times when you may want to intentionally not represent a specific funnel.

In that case, use createStep's deleteQueryParams to remove the Funnel from the screen.

# Get More Example

[App Router Example](https://github.com/XionWCFM/funnel/tree/main/apps/app-router-example)

[Pages Router Example](https://github.com/XionWCFM/funnel/tree/main/apps/pages-router-example)

[React Router Dom Example](https://github.com/XionWCFM/funnel/tree/main/apps/react-router-example)

# License

Licensed under the MIT license.
