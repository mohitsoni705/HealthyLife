import Button from "./Button"

const HeroSection = () => {
  return (
    <section className="bg-white  text-black">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-6 py-16 lg:px-10">
        <div className="max-w-3xl space-y-8">
          <span className="inline-flex rounded-full border border-blue-600 px-4 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-black shadow-sm">
            Welcome to MyHealth
          </span>

          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Simplify patient care, appointments, and clinic workflows in one place.
          </h1>

          <p className="max-w-2xl text-lg text-black border rounded-xl p-2 border-blue-500 sm:text-xl">
            MyHealth helps doctors, reception teams, and administrators manage appointments,
            patient records, and communication with fast, secure access from any device.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button innerText="Get Started" size="md" variant="primary" />
            <Button innerText="View Features" size="md" variant="secondary" />
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 ">
          <div className="rounded-3xl bg-white/10 p-6 shadow-lg backdrop-blur-xl">
            <p className="text-3xl font-bold">24/7</p>
            <p className="mt-2 text-sm text-black ">Appointment access</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-6 shadow-lg backdrop-blur-xl">
            <p className="text-3xl font-bold">100%</p>
            <p className="mt-2 text-sm text-black">HIPAA-friendly workflow</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-6 shadow-lg backdrop-blur-xl">
            <p className="text-3xl font-bold">Faster</p>
            <p className="mt-2 text-sm text-black">Patient check-in</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-6 shadow-lg backdrop-blur-xl">
            <p className="text-3xl font-bold">Secure</p>
            <p className="mt-2 text-sm text-black">Data and records</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
