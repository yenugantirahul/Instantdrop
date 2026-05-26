import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <SignIn routing="hash" />
        </div>
      </div>
    </div>
  )
}
