import { useState } from 'react';
import { ArrowLeft, Star, MessageSquare, TrendingUp, Award, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReviewsPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  // Translation object
  const translations = {
    es: {
      title: "Mis Reseñas",
      subtitle: "Todas las reseñas recibidas",
      average: "Promedio", 
      totalReviews: "Total Reseñas",
      mostCommon: "Más Común",
      fiveStars: "5 Estrellas",
      ratingDistribution: "Distribución de Calificaciones",
      recentReviews: "Reseñas",
      pendingReviews: "Por Completar",
      noReviews: "Aún no tienes reseñas",
      noReviewsDesc: "Completa tu primera colaboración para recibir reseñas de restaurantes.",
      exploreCollabs: "Explorar Colaboraciones",
      noPendingReviews: "No tienes reseñas pendientes",
      noPendingReviewsDesc: "Todas tus colaboraciones han sido completadas y revisadas."
    },
    en: {
      title: "My Reviews",
      subtitle: "All received reviews",
      average: "Average",
      totalReviews: "Total Reviews", 
      mostCommon: "Most Common",
      fiveStars: "5 Stars",
      ratingDistribution: "Rating Distribution",
      recentReviews: "Recent Reviews",
      pendingReviews: "To Complete",
      noReviews: "You don't have reviews yet",
      noReviewsDesc: "Complete your first collaboration to receive reviews from restaurants.",
      exploreCollabs: "Explore Collaborations",
      noPendingReviews: "You have no pending reviews",
      noPendingReviewsDesc: "All your collaborations have been completed and reviewed."
    }
  };
  const t = translations[language];

  // Mock data - in real app this would come from API
  const reviewStats = {
    averageRating: 4.7,
    totalReviews: 23,
    mostCommonRating: 5,
    ratingDistribution: {
      5: 15,
      4: 6,
      3: 2,
      2: 0,
      1: 0
    }
  };

  const completedReviews = [{
    id: 1,
    rating: 5,
    feedback: language === 'es' ? "Excelente colaboración! El contenido fue de muy alta calidad y se entregó a tiempo. Muy profesional." : "Excellent collaboration! The content was of very high quality and delivered on time. Very professional.",
    projectTitle: language === 'es' ? "Campaña Verano 2024 - Restaurante La Moderna" : "Summer 2024 Campaign - La Moderna Restaurant",
    reviewerName: "Restaurante La Moderna",
    reviewerType: "restaurant",
    date: "2024-01-15",
    tags: language === 'es' ? ["Profesional", "Puntual", "Gran Contenido"] : ["Professional", "Punctual", "Great Content"]
  }, {
    id: 2,
    rating: 4,
    feedback: language === 'es' ? "Buena experiencia general. Las fotos quedaron muy bien, aunque hubo un pequeño retraso en la entrega." : "Good overall experience. The photos turned out very well, although there was a small delay in delivery.",
    projectTitle: language === 'es' ? "Lanzamiento Menú Otoño - Bistro Central" : "Fall Menu Launch - Bistro Central",
    reviewerName: "Bistro Central",
    reviewerType: "restaurant",
    date: "2024-01-10",
    tags: language === 'es' ? ["Creativo", "Buena Calidad"] : ["Creative", "Good Quality"]
  }, {
    id: 3,
    rating: 5,
    feedback: language === 'es' ? "Increíble trabajo! Las stories tuvieron un engagement altísimo y trajeron muchos clientes nuevos." : "Incredible work! The stories had very high engagement and brought many new customers.",
    projectTitle: language === 'es' ? "Apertura Nueva Sucursal - Pizza Express" : "New Branch Opening - Pizza Express",
    reviewerName: "Pizza Express",
    reviewerType: "restaurant",
    date: "2024-01-08",
    tags: language === 'es' ? ["Profesional", "Gran Alcance", "Resultados Excelentes"] : ["Professional", "Great Reach", "Excellent Results"]
  }];

  const pendingReviews = [{
    id: 4,
    projectTitle: language === 'es' ? "Colaboración Menú Navideño - Café Delicias" : "Christmas Menu Collaboration - Café Delicias",
    reviewerName: "Café Delicias",
    reviewerType: "restaurant",
    date: "2024-01-20",
    status: "pending",
    description: language === 'es' ? "Esperando revisión del restaurante" : "Waiting for restaurant review"
  }, {
    id: 5,
    projectTitle: language === 'es' ? "Lanzamiento Brunch - Restaurante Sol" : "Brunch Launch - Restaurante Sol",
    reviewerName: "Restaurante Sol",
    reviewerType: "restaurant",
    date: "2024-01-18",
    status: "pending",
    description: language === 'es' ? "Colaboración completada, pendiente de revisión" : "Collaboration completed, pending review"
  }];

  const handleBack = () => {
    navigate('/');
  };

  const handlePendingReviewClick = (reviewId: number) => {
    navigate(`/review/${reviewId}`);
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4', 
      lg: 'w-5 h-5'
    };
    return <div className="flex items-center space-x-1 -mt-2">
        {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`${sizeClasses[size]} ${star <= rating ? 'fill-[#FFB800] text-[#FFB800]' : 'text-gray-300'}`} />)}
      </div>;
  };

  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl lg:max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{t.title}</h1>
              <p className="text-sm text-gray-500">{t.subtitle}</p>
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <Languages className="w-4 h-4 text-gray-500" />
            <Select value={language} onValueChange={(value: 'es' | 'en') => setLanguage(value)}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="en">EN</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="max-w-4xl lg:max-w-screen-xl mx-auto px-4 md:px-8 lg:px-32 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardContent className="p-4 pt-8 text-center flex flex-col h-full">
              <div className="flex items-center justify-center mb-2">
                {renderStars(Math.round(reviewStats.averageRating), 'sm')}
              </div>
              <div className="mt-1">
                <div className="text-2xl font-bold text-gray-900">
                  {reviewStats.averageRating}
                </div>
                <div className="text-xs text-gray-500">{t.average}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-4 text-center flex flex-col justify-center h-full">
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <div className="text-2xl font-bold text-gray-900">
                {reviewStats.totalReviews}
              </div>
              <div className="text-xs text-gray-500">{t.totalReviews}</div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-4 text-center flex flex-col justify-center h-full">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <div className="text-2xl font-bold text-gray-900">
                {reviewStats.mostCommonRating}
              </div>
              <div className="text-xs text-gray-500">{t.mostCommon}</div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-4 text-center flex flex-col justify-center h-full">
              <Award className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <div className="text-2xl font-bold text-gray-900">
                {reviewStats.ratingDistribution[5]}
              </div>
              <div className="text-xs text-gray-500">{t.fiveStars}</div>
            </CardContent>
          </Card>
        </div>

        {/* Rating Distribution */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{t.ratingDistribution}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[5, 4, 3, 2, 1].map(rating => {
            const count = reviewStats.ratingDistribution[rating as keyof typeof reviewStats.ratingDistribution];
            const percentage = count / reviewStats.totalReviews * 100;
            return <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-900 h-2 rounded-full transition-all duration-300" style={{
                  width: `${percentage}%`
                }}></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>;
          })}
          </CardContent>
        </Card>

        {/* Reviews Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">{t.pendingReviews}</TabsTrigger>
            <TabsTrigger value="completed">{t.recentReviews}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4 mt-6">
            {pendingReviews.length > 0 ? (
              pendingReviews.map(review => (
                <Card 
                  key={review.id} 
                  className="bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handlePendingReviewClick(review.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}
                          </span>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          {review.projectTitle}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'es' ? 'por' : 'by'} {review.reviewerName}
                        </p>
                        <p className="text-sm text-yellow-600">
                          {review.description}
                        </p>
                      </div>
                      <div className="text-sm text-gray-400">
                        {language === 'es' ? 'Toca para revisar' : 'Tap to review'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noPendingReviews}</h3>
                <p className="text-gray-500 mb-6">{t.noPendingReviewsDesc}</p>
                <Button onClick={() => navigate('/collaborations')} className="bg-[#E94E77] hover:bg-[#E94E77]/90">
                  {t.exploreCollabs}
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            {completedReviews.length > 0 ? (
              completedReviews.map(review => (
                <Card key={review.id} className="bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}
                          </span>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          {review.projectTitle}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'es' ? 'por' : 'by'} {review.reviewerName}
                        </p>
                      </div>
                    </div>
                    
                    {review.feedback && (
                      <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                        "{review.feedback}"
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Star className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noReviews}</h3>
                <p className="text-gray-500 mb-6">{t.noReviewsDesc}</p>
                <Button onClick={() => navigate('/collaborations')} className="bg-[#E94E77] hover:bg-[#E94E77]/90">
                  {t.exploreCollabs}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};

export default ReviewsPage;
