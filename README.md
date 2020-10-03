# Description
Branch 1.65.0 shows the bug by running and failing the test

Branch 1.54.0 shows what used to work

Project consist of a base lerna project and two packages: `app` and `external`, both created with `npx cdk init app --language=typescript`

The `app` project create two stacks, one stack defined inside the `app` project and one stack defined in the `external` project.

The `app` test tries to call `SynthUtils.toCloudFormation(stack)` on both stacks (works for the internal stack and fails for the external stack).

Fail:
```
Unable to find artifact with id "MyTestStack291FA567"
```

# Reproduce problem
```
npx lerna bootstrap
npx lerna run build
npx lerna run test
```

# Solution suggestion
```
diff --git a/packages/@aws-cdk/core/lib/private/synthesis.ts b/packages/@aws-cdk/core/lib/private/synthesis.ts
index c8243ec03..e93df721a 100644
--- a/packages/@aws-cdk/core/lib/private/synthesis.ts
+++ b/packages/@aws-cdk/core/lib/private/synthesis.ts
@@ -153,11 +153,11 @@ function synthesizeTree(root: IConstruct, builder: cxapi.CloudAssemblyBuilder) {
       assembly: builder,
     };
 
-    if (construct instanceof Stack) {
+    if (Stack.isStack(construct)) {
       construct.synthesizer.synthesize(session);
     } else if (construct instanceof TreeMetadata) {
       construct._synthesizeTree(session);
```