# ===== FILE: ./test_setup.py =====

import sys
import os

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

def test_imports():
    try:
        from backend.app import create_app
        from backend.utils.embeddings import get_embedding
        from backend.pinecone_client import index
        print("✅ All imports successful!")
        return True
    except Exception as e:
        print(f"❌ Import error: {e}")
        return False

def test_embeddings():
    try:
        from backend.utils.embeddings import get_embedding
        embedding = get_embedding("test text")
        print(f"✅ Embeddings working! Vector length: {len(embedding)}")
        return True
    except Exception as e:
        print(f"❌ Embeddings error: {e}")
        return False

if __name__ == "__main__":
    print("Testing TalentMatch backend setup...")
    test_imports()
    test_embeddings()