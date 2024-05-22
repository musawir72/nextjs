import LoginButton from "@/components/buttons/LoginButton";
const apiDomain =process.env.NEXTAUTH_URL || null
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
async function getProviders() {
  if(!apiDomain){
    console.error("API domain is not set");
    return [];
  }
  if (typeof window === 'undefined') {
    // If running during build time, skip the fetch
    console.log('Running during build time, skipping fetch');
    return [];
  }
  try {

    const res = await fetch(`${apiDomain}/api/auth/providers`);

  if (!res.ok) {
    throw new Error("Failed to fetch providers");
  }

  return res.json();
  } catch (error) {
    throw new Error('Failed to fetch providers')
    return [];
  }
  
}

export default async function SignIn() {
  const resp: ReturnType<typeof getProviders> = (await getProviders()) || {};

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="font-bold text-3xl mb-8">Custom Login Page</h1>
      {Object.values(resp).map((provider) => {
        return (
          <div key={provider.id} className="[&:not(:first-child)]:mt-4">
            <LoginButton auth={provider} />
          </div>
        );
      })}
    </div>
  );
}

