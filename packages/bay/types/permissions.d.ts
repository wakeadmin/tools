export declare type PermissionCheckType = 'AND' | 'OR';
/**
 * 检查是否有权限
 *
 * @param to 权限标识符，在当前激活上下文中查找
 * @param type 检查的类型, 支持 AND 或 OR，在传递多个权限标识符时有用，AND 表示必须拥有全部权限，OR 表示拥有其中一个即可
 */
export declare function allows(to: string[] | string, type?: PermissionCheckType): Promise<boolean>;
/**
 * 检查是否有权限(同步)
 *
 * @remarks
 * 如果bayModel没有初始化完毕的话
 * 那么默认返回`false`
 *
 * @param to 权限标识符，在当前激活上下文中查找
 * @param type 检查的类型, 支持 AND 或 OR，在传递多个权限标识符时有用，AND 表示必须拥有全部权限，OR 表示拥有其中一个即可
 */
export declare function allowsSync(to: string[] | string, type?: PermissionCheckType): boolean;
