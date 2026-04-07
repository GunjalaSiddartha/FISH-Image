import { History, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface HistoryItem {
  id: string;
  image_name: string;
  image_data: string;
  prediction: string;
  confidence: number;
  created_at: string;
}

interface AnalysisHistoryProps {
  refreshTrigger: number;
}

export function AnalysisHistory({ refreshTrigger }: AnalysisHistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('analysis_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error loading history:', error);
    } else {
      setHistory(data || []);
    }
    setLoading(false);
  };

  const deleteItem = async (id: string) => {
    const { error } = await supabase
      .from('analysis_history')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting item:', error);
    } else {
      loadHistory();
    }
  };

  useEffect(() => {
    loadHistory();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <History className="w-6 h-6" />
          Analysis History
        </h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <History className="w-6 h-6" />
        Analysis History
      </h2>

      {history.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No analysis history yet</p>
          <p className="text-sm">Upload an image to get started</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <img
                src={item.image_data}
                alt={item.image_name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-800 truncate">
                  {item.image_name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  {item.prediction === 'Bacteria Detected' ? (
                    <XCircle className="w-4 h-4 text-red-600" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                  <span className="text-xs text-gray-600">
                    {item.prediction} ({item.confidence}%)
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
