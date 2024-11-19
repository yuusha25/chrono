import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile from "../components/Profile/Profile";

const ProfilePage = () => (
    <div className="mx-auto font-poppins">
        <Header />
            <main className="mt-[120px] container max-w-5xl mx-auto px-4 py-8 flex-grow">
                <Profile />
            </main>
        <Footer />
    </div>
);

export default ProfilePage;