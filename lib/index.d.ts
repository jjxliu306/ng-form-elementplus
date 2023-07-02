
import type { App } from 'vue'; 

interface PlusGlobalOptions {
    size?: string;  
}

interface InstallOptions extends PlusGlobalOptions{
    locale?: any;
    i18n?: any;
}

 
export const install: (app: App, options?: InstallOptions) => void;
