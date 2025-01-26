import Head from 'next/head';

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing Plans</title>
        <meta name="description" content="Explore our pricing plans and choose the one that suits you best." />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
        <h1 className="text-4xl font-bold mb-4">Our Pricing Plans</h1>
        <p className="text-lg max-w-2xl text-center mb-8">
          Choose a plan that works for you and your team.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Basic Plan</h2>
            <p className="text-sm">Ideal for individuals.</p>
            <p className="mt-4 text-xl font-bold">$9/month</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Pro Plan</h2>
            <p className="text-sm">Great for small teams.</p>
            <p className="mt-4 text-xl font-bold">$29/month</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Enterprise Plan</h2>
            <p className="text-sm">Best for large organizations.</p>
            <p className="mt-4 text-xl font-bold">$99/month</p>
          </div>
        </div>
      </div>
    </>
  );
}
