export const render = (data: any) =>
    <div class="h-screen w-screen flex items-center justify-center">
        <div class="text-3xl font-semibold text-orange-600">Hello {data.some}!</div>
    </div>;

export const head = () => <title>Hello World!</title>;