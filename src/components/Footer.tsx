export default function Footer() {
  return (
    <footer className="mt-16 py-8 px-4 text-center text-white/60 z-10 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Start Being More Productive Today
          </h3>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto">
            Join millions of users who have improved their focus and
            productivity with the Pomodoro Technique. This free online timer
            helps you work smarter, not harder.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8 text-sm">
          <div>
            <h4 className="font-semibold text-white mb-3">Features</h4>
            <ul className="space-y-1">
              <li>• Customizable timer intervals</li>
              <li>• Multiple notification sounds</li>
              <li>• Progress tracking</li>
              <li>• Auto-sequence mode</li>
              <li>• Works offline</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Benefits</h4>
            <ul className="space-y-1">
              <li>• Improved focus and concentration</li>
              <li>• Better time management</li>
              <li>• Reduced procrastination</li>
              <li>• Increased productivity</li>
              <li>• Better work-life balance</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Perfect For</h4>
            <ul className="space-y-1">
              <li>• Students studying</li>
              <li>• Remote workers</li>
              <li>• Freelancers</li>
              <li>• Writers and creators</li>
              <li>• Anyone wanting better focus</li>
            </ul>
          </div>
        </div>

        <div className="text-xs space-y-2">
          <p>
            © 2024 Pomodoro Timer by Joseph Deakin. Free online productivity
            tool.
          </p>
          <p>
            Keywords: free pomodoro timer, online timer, productivity tool,
            focus timer, study timer, work timer, time management, pomodoro
            technique
          </p>
        </div>
      </div>
    </footer>
  );
}
