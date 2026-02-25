export interface AgentContext {
    type: 'general' | 'openapi' | 'schema' | 'example' | 'custom';
    label: string;
    content: string | object;
}

export interface AgentTool {
    type: 'openapi';
    name: string[];
    description?: string;
    spec: object;
}

export interface AgentOptions {
    model?: string;
    prompt: string;
    instructions?: string;
    contexts?: AgentContext[];
    tools?: AgentTool[];
    responseFormat?: 'json_object' | 'text';
    result?: any[];    
    executeOperations?: boolean;
    crudModel?: any; 
    userId?: number;
    dealId?: number;
}

export interface AgentOperationResponse {
    operation: 'create' | 'read' | 'update' | 'delete';
    tool: string;
    data?: any;
    params?: any;
    message?: string;
    executed?: boolean;
    executionResult?: any;
    executionError?: string;
}