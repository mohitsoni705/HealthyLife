type Feature = {
  title: string
  description: string
  cta: string
  icon: string
}

const featureList: Feature[] = [
  {
    title: 'Patient Management',
    description:
      'Comprehensive patient profiles, appointment scheduling, medical history records, and treatment tracking in one centralized system.',
    cta: 'Learn more',
    icon: 'patient',
  },
  {
    title: 'Appointment Scheduling',
    description:
      'Efficient appointment booking with automated reminders, doctor availability tracking, and real-time schedule management.',
    cta: 'Learn more',
    icon: 'calendar',
  },
  {
    title: 'Billing & Insurance Management',
    description:
      'Simplified billing processes with insurance claim handling, payment tracking, digital invoices, and financial reporting.',
    cta: 'Learn more',
    icon: 'billing',
  },
  {
    title: 'Medical Records Management',
    description:
      'Secure electronic health records with instant access to patient data, prescriptions, test results, and treatment history.',
    cta: 'Learn more',
    icon: 'records',
  },
  {
    title: 'Secure Access Control',
    description:
      'Role-based permissions with separate admin, doctor, nurse, and patient portals, ensuring data security and confidentiality.',
    cta: 'Learn more',
    icon: 'shield',
  },
]

const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <div className="rounded-[28px] border border-slate-200/90 bg-white p-6 text-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 shadow-sm shadow-slate-200">
        <span className="text-lg font-semibold">
          {feature.icon === 'calendar' ? '📅' : feature.icon === 'shield' ? '🛡️' : feature.icon === 'billing' ? '💳' : feature.icon === 'records' ? '📁' : '👨‍⚕️'}
        </span>
      </div>
      <h3 className="mb-3 text-xl font-semibold text-slate-950">{feature.title}</h3>
      <p className="mb-6 max-w-[32rem] text-sm leading-7 text-slate-600">{feature.description}</p>
      <button className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-700">
        {feature.cta}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}

const ViewFeatures = () => {
  return (
    <section id='feature' className="mx-auto max-w-[1260px] px-6 py-16 text-slate-950 sm:px-8 lg:px-10">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
          Complete Hospital <span className="text-sky-600">Management Solution</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          Streamline your hospital operations with our integrated platform that handles patients, billings, records, employees and deeper analytics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featureList.map((feature) => (
          <FeatureCard feature={feature} key={feature.title} />
        ))}
      </div>

    </section>
  )
}

export default ViewFeatures
