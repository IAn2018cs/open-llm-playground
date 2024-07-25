import { IconLogo } from "./icons";

const EmptyScreen = () => {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-2 shadow-md md:p-8">
        <IconLogo className="mx-auto mb-2 h-10 w-10 md:mb-8 md:h-28 md:w-28" />
        <h1 className="mb-1 text-center text-lg font-semibold md:mb-3 md:text-2xl">
          欢迎来到 Open LLM 游乐场!
        </h1>
        <p className="text-center text-xs leading-normal text-muted-foreground md:mb-2 md:text-base">
          游乐场可以帮助您测试 LLM 模型参数和提示
          <br />
          您可以从下面输入提示开始
        </p>
      </div>
    </div>
  );
};

export default EmptyScreen;
