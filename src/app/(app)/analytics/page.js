import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function AnalyticsPage() {
  mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);

  if (!session) {
    // Show message when the user is not logged in
    return (
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-xl space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          You are not logged in!
        </h2>
        <p className="text-center text-gray-600">
          Please log in to view your analytics.
        </p>
        <a href="/auth/signin" className="block text-center mt-4 text-blue-500">
          Log In
        </a>
      </div>
    );
  }

  const page = await Page.findOne({ owner: session.user.email });

  if (!page) {
    // Show message when no page is found for the user
    return (
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-xl space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          No Page Found
        </h2>
        <p className="text-center text-gray-600">
          It seems like you haven't selected a username. Start a creating one to
          see analytics here.
        </p>
        <a href="/account" className="block text-center mt-4 text-blue-500">
          Select username
        </a>
      </div>
    );
  }

  const groupedViews = await Event.aggregate([
    {
      $match: {
        type: "view",
        uri: page.uri,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $count: {},
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const clicks = await Event.find({
    page: page.uri,
    type: "click",
  });

  return (
    <div>
      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Views</h2>
        <Chart
          data={groupedViews.map((o) => ({
            date: o._id,
            views: o.count,
          }))}
        />
      </SectionBox>
      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Clicks</h2>
        {page.links.map((link) => (
          <div
            key={link.title}
            className="md:flex gap-4 items-center border-t border-gray-200 py-4"
          >
            <div className="text-blue-500 pl-4">
              <FontAwesomeIcon icon={faLink} />
            </div>
            <div className="grow">
              <h3>{link.title || "no title"}</h3>
              <p className="text-gray-700 text-sm">
                {link.subtitle || "no description"}
              </p>
              <a
                className="text-xs text-blue-400"
                target="_blank"
                href={link.url}
              >
                {link.url}
              </a>
            </div>
            <div className="text-center">
              <div className="border rounded-md p-2 mt-1 md:mt-0">
                <div className="text-3xl">
                  {
                    clicks.filter(
                      (c) => c.uri === link.url && isToday(c.createdAt)
                    ).length
                  }
                </div>
                <div className="text-gray-400 text-xs uppercase font-bold">
                  clicks today
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="border rounded-md p-2 mt-1 md:mt-0">
                <div className="text-3xl">
                  {clicks.filter((c) => c.uri === link.url).length}
                </div>
                <div className="text-gray-400 text-xs uppercase font-bold">
                  clicks total
                </div>
              </div>
            </div>
          </div>
        ))}
      </SectionBox>
    </div>
  );
}
