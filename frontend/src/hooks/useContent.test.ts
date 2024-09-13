import { renderHook, act } from '@testing-library/react-hooks';
import { useContent } from '@/hooks/useContent';
import * as contentService from '@/services/contentService';
import { Content } from '@/models/Content';

// Mock de getContent
jest.mock('@/services/contentService');

const mockContents: Content[] = [
  { id: '1', title: 'Content 1', type: 'text', url: '/uploads/1.txt', author: 'author1', topic: 'topic1', createdAt: new Date() },
  { id: '2', title: 'Content 2', type: 'video', url: 'http://example.com/video.mp4', author: 'author2', topic: 'topic2', createdAt: new Date() },
];

describe('useContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch contents and set them to state', async () => {
    (contentService.getContent as jest.Mock).mockResolvedValue(mockContents);

    const { result, waitForNextUpdate } = renderHook(() => useContent());

    // Esperar a que se actualice el estado después de la llamada asíncrona
    await waitForNextUpdate();

    expect(result.current.contents).toEqual(mockContents);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch failure and set error state', async () => {
    (contentService.getContent as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    const { result, waitForNextUpdate } = renderHook(() => useContent());

    // Esperar a que se actualice el estado después de la llamada asíncrona
    await waitForNextUpdate();

    expect(result.current.contents).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch content');
  });

  it('should call fetchContents with query and searchBy', async () => {
    const { result } = renderHook(() => useContent());

    await act(async () => {
      await result.current.fetchContents('Content', 'title');
    });

    expect(contentService.getContent).toHaveBeenCalledWith('Content', 'title');
  });
});
