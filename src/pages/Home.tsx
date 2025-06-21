import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { enviarImagem } from "../utils/api";

// Tipo da resposta do backend
type ResultadoAPI = {
  emocao_principal: string;
  probabilidades: Record<string, number>;
};

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!image) return;

    try {
      const resultado: ResultadoAPI = await enviarImagem(image);

      const emotion = resultado.emocao_principal;
      const raw = resultado.probabilidades;

      const total = Object.values(raw).reduce((acc, val) => acc + val, 0);
      const probabilities: Record<string, number> = Object.fromEntries(
        Object.entries(raw).map(([key, val]) => [key, val / total])
      );

      navigate("/result", {
        state: {
          emotion,
          probabilities,
        },
      });
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        alert("Erro ao analisar imagem: " + erro.message);
      } else {
        alert("Erro inesperado ao analisar imagem.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <img src={Logo} alt="Logo" className="w-40 mb-4" />
      <h1 className="text-4xl font-bold mb-2 text-gray-800">Detector de Emoções</h1>
      <p className="mb-6 text-gray-600 text-center">
        Envie uma foto e veja qual emoção está mais presente
      </p>

      {imagePreview ? (
        <div className="mb-4 flex flex-col items-center">
          <img
            src={imagePreview}
            className="w-72 h-72 object-cover rounded-lg shadow-md border-2 border-gray-300"
          />
          <button
            onClick={handleRemoveImage}
            className="mt-3 text-blue-600 hover:underline text-sm"
          >
            Trocar imagem
          </button>
        </div>
      ) : (
        <>
          <label
            htmlFor="imageUpload"
            className="cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 w-72 text-center text-gray-500 hover:border-blue-500 transition mb-4"
          >
            Clique para escolher uma imagem
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </>
      )}

      <button
        onClick={handleSubmit}
        disabled={!image}
        className={`w-72 py-2 rounded text-white transition ${
          image ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Detectar Emoção
      </button>
    </div>
  );
}
