/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // Transpile TypeScript files in the @supabase/ssr package
      config.module.rules.push({
        test: /\.ts$/,
        include: /node_modules\/@supabase\/ssr/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true, // Skip type-checking during the build
          },
        },
      });
  
      return config;
    },
  
    // Enable future Next.js Webpack optimizations
    experimental: {
      esmExternals: 'loose', // Allows ESM imports from node_modules
    },
  };
  
  export default nextConfig;
  