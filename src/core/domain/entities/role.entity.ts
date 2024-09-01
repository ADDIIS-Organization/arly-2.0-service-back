/**
 * Represents a Role entity.
 */
export class Role {
  id: number;
  name: string;
  description: string;

  /**
   * Creates a new Role entity.
   *
   * @param name - The name of the role.
   * @param description - The description of the role.
   * @returns The newly created Role entity.
   */
  static create(name: string, description: string): Role {
    const role = new Role();
    role.name = name;
    role.description = description;
    return role;
  }

  /**
   * Updates the role with the given name and description.
   *
   * @param name - The new name for the role.
   * @param description - The new description for the role.
   * @returns void
   */
  update(name: string, description: string): void {
    this.name = name;
    this.description = description;
  }
}
