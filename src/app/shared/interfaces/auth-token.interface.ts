export interface AuthTokenInterface {
  id: number;
  email: string;
  role: string;
  surname?: string;
  name?: string;
  imagePath?: string;
}
