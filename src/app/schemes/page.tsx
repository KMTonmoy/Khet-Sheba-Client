'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Scheme {
    name: string;
    description: string;
    contact: string;
    link: string;
}

interface Complaint {
    name: string;
    phone: string;
    district: string;
    location: string;
    issue: string;
    details: string;
}

const GovSchemes = () => {
    const [complaint, setComplaint] = useState<Complaint>({
        name: '',
        phone: '',
        district: '',
        location: '',
        issue: '',
        details: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setComplaint(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert('আপনার অভিযোগটি জমা হয়েছে। ধন্যবাদ!');
        setComplaint({
            name: '',
            phone: '',
            district: '',
            location: '',
            issue: '',
            details: ''
        });
    };

    const schemes: Scheme[] = [
        {
            name: 'কৃষি ভর্তুকি',
            description: 'সার, বীজ ও কৃষি যন্ত্রপাতিতে ৩০-৭০% ভর্তুকি',
            contact: 'কৃষি সম্প্রসারণ অধিদপ্তর, ১৬১২৩',
            link: 'https://www.ais.gov.bd'
        },
        {
            name: 'কৃষি কার্ড',
            description: 'বিশেষ সুবিধা প্রাপ্তির জন্য আবেদন করুন',
            contact: 'ই-সেবা কেন্দ্র বা ইউনিয়ন ডিজিটাল সেন্টার',
            link: 'https://services.agriculture.gov.bd'
        },
        {
            name: 'ফসল বীমা',
            description: 'প্রাকৃতিক দুর্যোগে ক্ষতিপূরণ পেতে আবেদন করুন',
            contact: 'বাংলাদেশ কৃষি ব্যাংক, ১৬৪৩০',
            link: 'https://www.krishibank.org.bd'
        },
        {
            name: 'কৃষি ঋণ',
            description: 'সুবিধাজনক শর্তে ঋণ পেতে যোগাযোগ করুন',
            contact: 'কৃষি ব্যাংক শাখা অফিস',
            link: 'https://www.krishibank.org.bd/loan'
        },
        {
            name: 'মাটির স্বাস্থ্য কার্ড',
            description: 'বিনামূল্যে মাটি পরীক্ষা ও পরামর্শ সেবা',
            contact: 'স্থানীয় কৃষি অফিস',
            link: 'https://soilhealth.dae.gov.bd'
        },
        {
            name: 'ডিজিটাল কৃষি পরামর্শ',
            description: 'মোবাইল অ্যাপের মাধ্যমে বিশেষজ্ঞ পরামর্শ',
            contact: 'কৃষি কল সেন্টার, ১৬১২৩',
            link: 'https://play.google.com/store/apps/details?id=com.dae.agricare'
        }
    ];

    const commonIssues: string[] = [
        'সারের দাম বেশি',
        'বীজের গুণগত মান ভালো নয়',
        'কৃষি উপকরণে ভেজাল',
        'ফসলের ন্যায্য মূল্য পাচ্ছি না',
        'কৃষি ঋণ পেতে সমস্যা',
        'ভর্তুকি পাচ্ছি না'
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-green-700 mb-2">সরকারি কৃষি সুযোগ-সুবিধা</h1>
            <p className="text-center text-gray-600 mb-8">বাংলাদেশ সরকারের কৃষি সম্পর্কিত সকল সহায়তা ও পরিষেবা</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {schemes.map((scheme, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-green-200 hover:shadow-lg transition-shadow">
                        <div className="bg-green-600 px-4 py-3">
                            <h2 className="text-xl font-semibold text-white">{scheme.name}</h2>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-700 mb-4">{scheme.description}</p>
                            <div className="mb-3">
                                <p className="text-sm font-semibold text-gray-600">যোগাযোগ:</p>
                                <p className="text-green-700 font-medium">{scheme.contact}</p>
                            </div>
                            <a
                                href={scheme.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200 transition-colors"
                            >
                                বিস্তারিত জানুন
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-12">
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">অভিযোগ ও পরামর্শ ফর্ম</h2>
                <p className="text-center text-gray-600 mb-6">কৃষি পণ্যের দাম, ভেজাল বা অন্য কোনো সমস্যা সম্পর্কে জানান</p>

                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 mb-2">আপনার নাম</label>
                            <input
                                type="text"
                                name="name"
                                value={complaint.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">মোবাইল নম্বর</label>
                            <input
                                type="tel"
                                name="phone"
                                value={complaint.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">জেলা</label>
                        <select
                            name="district"
                            value={complaint.district}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        >
                            <option value="">জেলা নির্বাচন করুন</option>
                            <option value="বাগেরহাট">বাগেরহাট</option>
                            <option value="বান্দরবান">বান্দরবান</option>
                            <option value="বরগুনা">বরগুনা</option>
                            <option value="বরিশাল">বরিশাল</option>
                            <option value="ভোলা">ভোলা</option>
                            <option value="ব্রাহ্মণবাড়িয়া">ব্রাহ্মণবাড়িয়া</option>
                            <option value="চাঁদপুর">চাঁদপুর</option>
                            <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                            <option value="চুয়াডাঙ্গা">চুয়াডাঙ্গা</option>
                            <option value="কুমিল্লা">কুমিল্লা</option>
                            <option value="কক্সবাজার">কক্সবাজার</option>
                            <option value="ঢাকা">ঢাকা</option>
                            <option value="দিনাজপুর">দিনাজপুর</option>
                            <option value="ফরিদপুর">ফরিদপুর</option>
                            <option value="ফেনী">ফেনী</option>
                            <option value="গাইবান্ধা">গাইবান্ধা</option>
                            <option value="গাজীপুর">গাজীপুর</option>
                            <option value="গোপালগঞ্জ">গোপালগঞ্জ</option>
                            <option value="হবিগঞ্জ">হবিগঞ্জ</option>
                            <option value="জামালপুর">জামালপুর</option>
                            <option value="যশোর">যশোর</option>
                            <option value="ঝালকাঠি">ঝালকাঠি</option>
                            <option value="ঝিনাইদহ">ঝিনাইদহ</option>
                            <option value="খাগড়াছড়ি">খাগড়াছড়ি</option>
                            <option value="খুলনা">খুলনা</option>
                            <option value="কিশোরগঞ্জ">কিশোরগঞ্জ</option>
                            <option value="কুড়িগ্রাম">কুড়িগ্রাম</option>
                            <option value="লক্ষ্মীপুর">লক্ষ্মীপুর</option>
                            <option value="লালমনিরহাট">লালমনিরহাট</option>
                            <option value="মাদারীপুর">মাদারীপুর</option>
                            <option value="মাগুরা">মাগুরা</option>
                            <option value="মানিকগঞ্জ">মানিকগঞ্জ</option>
                            <option value="মেহেরপুর">মেহেরপুর</option>
                            <option value="মৌলভীবাজার">মৌলভীবাজার</option>
                            <option value="মুন্সিগঞ্জ">মুন্সিগঞ্জ</option>
                            <option value="ময়মনসিংহ">ময়মনসিংহ</option>
                            <option value="নড়াইল">নড়াইল</option>
                            <option value="নরসিংদী">নরসিংদী</option>
                            <option value="নাটোর">নাটোর</option>
                            <option value="নওগাঁ">নওগাঁ</option>
                            <option value="নেত্রকোণা">নেত্রকোণা</option>
                            <option value="নীলফামারী">নীলফামারী</option>
                            <option value="নোয়াখালী">নোয়াখালী</option>
                            <option value="পাবনা">পাবনা</option>
                            <option value="পঞ্চগড়">পঞ্চগড়</option>
                            <option value="পটুয়াখালী">পটুয়াখালী</option>
                            <option value="পিরোজপুর">পিরোজপুর</option>
                            <option value="রাজবাড়ী">রাজবাড়ী</option>
                            <option value="রাজশাহী">রাজশাহী</option>
                            <option value="রাঙ্গামাটি">রাঙ্গামাটি</option>
                            <option value="রংপুর">রংপুর</option>
                            <option value="শরীয়তপুর">শরীয়তপুর</option>
                            <option value="সাতক্ষীরা">সাতক্ষীরা</option>
                            <option value="শেরপুর">শেরপুর</option>
                            <option value="সিরাজগঞ্জ">সিরাজগঞ্জ</option>
                            <option value="সুনামগঞ্জ">সুনামগঞ্জ</option>
                            <option value="সিলেট">সিলেট</option>
                            <option value="টাঙ্গাইল">টাঙ্গাইল</option>
                            <option value="ঠাকুরগাঁও">ঠাকুরগাঁও</option>
                            <option value="বরিশাল">বরিশাল</option>
                            <option value="সিলেট">সিলেট</option>
                            <option value="রংপুর">রংপুর</option>
                            <option value="ময়মনসিংহ">ময়মনসিংহ</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">আপনার অবস্থান</label>
                        <input
                            type="text"
                            name="location"
                            value={complaint.location}
                            onChange={handleChange}
                            placeholder="আপনার সঠিক অবস্থান লিখুন"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">সমস্যার ধরন</label>
                        <select
                            name="issue"
                            value={complaint.issue}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        >
                            <option value="">সমস্যা নির্বাচন করুন</option>
                            {commonIssues.map((issue, index) => (
                                <option key={index} value={issue}>{issue}</option>
                            ))}
                            <option value="অন্যান্য">অন্যান্য</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">বিস্তারিত বিবরণ</label>
                        <textarea
                            name="details"
                            value={complaint.details}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
                        >
                            অভিযোগ জমা দিন
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-center text-yellow-700 mb-4">জরুরি যোগাযোগ</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                        <h3 className="text-lg font-bold text-red-600 mb-2">কৃষি কল সেন্টার</h3>
                        <p className="text-2xl font-bold">১৬১২৩</p>
                        <p className="text-gray-600 mt-1">২৪ ঘন্টা</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                        <h3 className="text-lg font-bold text-red-600 mb-2">কৃষি বিপর্যয় হেল্পলাইন</h3>
                        <p className="text-2xl font-bold">১০৯০</p>
                        <p className="text-gray-600 mt-1">জরুরি অবস্থায়</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                        <h3 className="text-lg font-bold text-red-600 mb-2">কৃষি মন্ত্রণালয়</h3>
                        <p className="text-2xl font-bold">০২-৯৫৫৫৯৫৫</p>
                        <p className="text-gray-600 mt-1">সকাল ৯টা - বিকাল ৫টা</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GovSchemes;