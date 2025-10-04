import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function AuthButton() {
  return (
    <>
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <Button className="h-10 rounded-full px-4 text-sm text-white sm:h-12 sm:px-5 sm:text-base">
            Sign Up
          </Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
