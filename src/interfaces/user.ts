import type BaseModelInterface from './base';
export default interface UserInterface extends BaseModelInterface {
    email: string;
    password: string;
}