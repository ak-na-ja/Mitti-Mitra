import PestHelp from '../PestHelp';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function PestHelpExample() {
  return (
    <LanguageProvider>
      <div className="p-4">
        <PestHelp />
      </div>
    </LanguageProvider>
  );
}
