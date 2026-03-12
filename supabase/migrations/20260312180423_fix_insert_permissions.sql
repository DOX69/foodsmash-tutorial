-- Grant usage to the anon role
GRANT USAGE ON SCHEMA foodsmash TO anon;
GRANT USAGE ON SCHEMA foodsmash TO authenticated;

-- Grant select and insert to the anon role
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA foodsmash TO anon;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA foodsmash TO authenticated;

-- Ensure future tables also have select and insert granted
ALTER DEFAULT PRIVILEGES IN SCHEMA foodsmash GRANT SELECT, INSERT, UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA foodsmash GRANT SELECT, INSERT, UPDATE ON TABLES TO authenticated;

-- Grant usage on sequences (important for serial/identity columns if used, though we use UUID)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA foodsmash TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA foodsmash TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA foodsmash GRANT USAGE, SELECT ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA foodsmash GRANT USAGE, SELECT ON SEQUENCES TO authenticated;
