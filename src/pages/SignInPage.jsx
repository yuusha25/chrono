import SignInForm from "../components/SignIn/SignInForm"; // Assuming SignInForm is a reusable component

const SignIn = () => (
  <div className="font-poppins">
    <h1 className="text-3xl font-bold text-center text-[#365486] mb-8">
      Sign In
    </h1>
    <SignInForm />
  </div>
);

export default SignIn;
