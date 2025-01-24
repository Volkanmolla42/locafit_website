interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function Textarea({ error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      <textarea
        className={`w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200
          ${error ? 'border-red-500' : 'border-gray-200'}
          ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
