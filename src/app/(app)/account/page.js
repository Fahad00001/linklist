import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import cloneDeep from "clone-deep";

// export default async function AccountPage({searchParams}) {
//   const session = await getServerSession(authOptions);
//   const desiredUsername = searchParams?.desiredUsername;
//   if (!session) {
//     return redirect('/');
//   }
//   mongoose.connect(process.env.MONGO_URI);
//   const page = await Page.findOne({owner: session?.user?.email});

//   const leanPage = cloneDeep(page.toJSON());
//   leanPage._id = leanPage._id.toString();
//   if (page) {
//     return (
//       <>
//         <PageSettingsForm page={leanPage} user={session.user} />
//         <PageButtonsForm page={leanPage} user={session.user} />
//         <PageLinksForm page={leanPage} user={session.user} />
//       </>
//     );
//   }

//   return (
//     <div>
//       <UsernameForm desiredUsername={desiredUsername} />
//     </div>
//   );
// }

export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;

  // Redirect if session is not available
  if (!session) {
    return redirect('/');
  }

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URI);

  // Fetch the page document
  const page = await Page.findOne({ owner: session?.user?.email });

  // Check if the page exists
  if (page) {
    const leanPage = cloneDeep(page.toJSON()); // Avoid accessing toJSON() on null
    leanPage._id = leanPage._id.toString();

    return (
      <>
        <PageSettingsForm page={leanPage} user={session.user} />
        <PageButtonsForm page={leanPage} user={session.user} />
        <PageLinksForm page={leanPage} user={session.user} />
      </>
    );
  }

  // Render the UsernameForm if no page is found
  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
}

