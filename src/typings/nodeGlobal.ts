declare module NodeJS {
    interface Global {
        document: Document;
        window: Window;
        HermesInternal?: object;
    }
}

declare interface NodeModule {
    hot: {
        accept(path?: string, callback?: () => void): void
    }
}