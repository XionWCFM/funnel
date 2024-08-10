![usefunnel thumbnail](/thumbnail.png)

# useFunnel

**Freedom From Details** : Instead of relying directly on the router, it provides instructions on where to route.

**Flexible Customization** : We advocate funnel management via queryString, but you can also implement it another way via useCoreFunnel.

**Nested funnel support** : Managing nested funnels is one of the biggest headaches. We offer a way to deal with this

**Guard support** : Provides a way to block access by malicious users.

**Separate declaration and use of funnels** : For flexible design, we separate the part that defines the funnel from the part that uses it.


# Quick Start

## next.js app router

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
    steps: ["a", "b", "c"] as const,
    funnelId: "hello-this-is-funnel-id",
  });
```

### import useFunnel

```tsx
"use client";
import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { useRouter } from "next/navigation";

export const BasicFunnel = () => {
  const [Funnel, controller] = useFunnel(basicFunnelOptions());
  const router = useRouter();
  return (
    <Funnel>
      <Funnel.Step name="a">
        <FunnelItem
          setStep={() => {
            router.push(`/funnel?${controller.createStep("b")}`);
          }}
          step="a"
        />
      </Funnel.Step>
      <Funnel.Step name="b">
        <FunnelItem
          setStep={() => {
            router.push(`/funnel?${controller.createStep("c")}`);
          }}
          step="b"
        />
      </Funnel.Step>
      <Funnel.Step name="c">
        <FunnelItem
          setStep={() => {
            router.push(`/funnel?${controller.createStep("a")}`);
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
  step?: T[number] | undefined;
  funnelId: string;
};
```

`funnelOptions` shares the same concept as queryOptions in tanstack query. Used to create a type-safe option object.

`funnelId` is generally used as the key value of querystring.

## Guard

```tsx
interface GuardProps<T> {
  condition: (() => T) | (() => Promise<T>);
  children?: ReactNode;
  onRestrict?: (param: Awaited<T>) => void;
  conditionBy?: (param: Awaited<T>) => boolean;
  fallback?: ReactNode;
}
```

`condition` is a function that must return whether the funnel can be accessed.

`onRestrict` runs when condition is false.

`conditionBy` is required if the value returned by condition is not boolean. It should return a boolean.

`fallback` is the fallback that will be displayed when the condition is Falsy.

simple Example

```tsx
 <Funnel.Guard
    condition={Math.random() > 0.5}
    onRestrict=() => {
      router.replace('/home')
    }}
  >
    <FunnelItem
      setStep={() => {
        router.push(`/guard?${controller.createStep("c")}`);
      }}
      step="b"
    />
  </Funnel.Guard>
```

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
      step: Steps[number],
      searchParams?: URLSearchParams,
      deleteQueryParams?: string[] | string
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

### FunnelClient.createStep

```tsx
createStep(step:string , options:{
    searchParams?: URLSearchParams;
    deleteQueryParams?: string[] | string;
    qsOptions?: QueryString.IStringifyBaseOptions;
})
```

For deleteQueryParams, enter the key value of queryParams you want to delete. qsOptions uses StringifyBaseOptions from the qs library.

# Nested Funnel Example

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
              router.push(`/nested?${aController.createStep("ado")}`);
            }}
            step={"astart"}
          />
        </AFunnel.Step>
        <AFunnel.Step name={"ado"}>
          <FunnelItem
            setStep={() => {
              router.push(
                `/nested?${bController.createStep("bstart", { searchParams, deleteQueryParams: aController.funnelId })}`
              );
            }}
            step={"ado"}
          />
        </AFunnel.Step>
        <AFunnel.Step name={"aend"}>
          <FunnelItem
            setStep={() => {
              router.push(`/nested?${aController.createStep("astart")}`);
            }}
            step={"aend"}
          />
        </AFunnel.Step>
      </AFunnel>

      <BFunnel>
        <BFunnel.Step name={"bstart"}>
          <FunnelItem
            setStep={() => {
              router.push(`/nested?${bController.createStep("bdo")}`);
            }}
            step={"bstart"}
          />
        </BFunnel.Step>
        <BFunnel.Step name={"bdo"}>
          <FunnelItem
            setStep={() => {
              router.push(`/nested?${bController.createStep("bend")}`);
            }}
            step={"bdo"}
          />
        </BFunnel.Step>
        <BFunnel.Step name={"bend"}>
          <FunnelItem
            setStep={() => {
              router.push(
                `/nested?${aController.createStep("aend", { searchParams, deleteQueryParams: bController.funnelId })}`
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

# Get More Example

[App Router Example](https://github.com/XionWCFM/funnel/tree/main/apps/app-router-example)

# License

Licensed under the MIT license.
